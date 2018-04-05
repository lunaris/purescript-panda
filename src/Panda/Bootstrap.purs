module Panda.Bootstrap
  ( bootstrap
  ) where

import Control.Alt           ((<|>))
import Control.Monad.Eff     (Eff)
import Control.Monad.Eff.Ref as Ref
import DOM.Node.Types        (Document, Node) as DOM
import FRP.Event             (Event, subscribe) as FRP
import Panda.Internal        as I
import Panda.Render.Element  as Element

import Prelude

-- | Given an application, produce the DOM element and the system of events
-- | around it. This is mutually recursive with the `render` function.
bootstrap
  ∷ ∀ eff update state event
  . DOM.Document
  → I.Application (I.FX eff) update state event
  → Eff (I.FX eff)
      { element ∷ DOM.Node
      , system ∷ I.EventSystem (I.FX eff) update state event
      }

bootstrap document { initial, subscription, update, view } = do
  result ← Element.render (bootstrap document) document view

  result.system # I.foldEventSystem (pure result) \system → do
    stateRef ← Ref.newRef initial.state

    let
      events ∷ FRP.Event event
      events = subscription <|> system.events

    cancel ← FRP.subscribe events \event → do
      state ← Ref.readRef stateRef

      { event, state } # update \callback → do
        mostRecentState ← Ref.readRef stateRef
        let new@{ state } = callback mostRecentState

        Ref.writeRef stateRef state
        system.handleUpdate new

    system.handleUpdate initial

    pure $ result
      { system = I.DynamicSystem
          $ system
              { cancel = do
                  system.cancel
                  cancel
              }
      }
