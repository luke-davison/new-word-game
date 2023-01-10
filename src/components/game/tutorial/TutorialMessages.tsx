import './styles/TutorialMessages.css'

import { observer } from 'mobx-react-lite'
import { FunctionComponent, useState } from 'react'
import { Popup } from '../../general/Popup'

export const TutorialMessages: FunctionComponent = observer(() => {

  const [messageIndex, setMessageIndex] = useState<number>(1)

  let popupBody: React.ReactNode
  let popupElementId: string | undefined

  switch (messageIndex) {
    case 1:
      popupBody = (
        <>
          <div>Welcome to Lettermonger.</div>
          <div>In this game you will buy and arrange letters to make a word - ideally a high scoring word.</div>
          <div>Each game you have a set amount of money and you can buy as many letters as you want - and can afford.</div>
        </>
      )
      break
    case 2:
      popupElementId = 'letter-11'
      popupBody = (
        <>
          <div>Letters can be bought by dragging the letter into the word area, or by double clicking on the letter in the shop to quick add.</div>
          <div>Usually each letter can be bought multiple times.</div>
        </>
      )
      break
    case 3:
      popupElementId = 'player-area-cell-1'
      popupBody = (
        <>
          <div>Once purchased, letters can be freely rearranged by dragging them to the new position.</div>
          <div>Purchased letters can also be returned by dragging them out of the word area or by double clicking.  There is no penalty for returning a bought letter - you always get a full refund.</div>
        </>
      )
      break
    case 4:
      popupElementId = 'letter-11'
      popupBody = (
        <>
          <div>Each letter is worth a certain number of points.  This is the number in the top right corner of each letter</div>
          <div>Additionally, many letters also have an effect which can grant extra points, depending on how they are arranged in your word.</div>
        </>
      )
      break
    case 5:
      popupElementId = 'letter-12'
      popupBody = (
        <>
          <div>For example, this letter gains extra points if it is next to a vowel.</div>
          <div>If it is placed with a vowel immediately before or after (or both) then it will score an extra three points (on top of the regular three points that it will score regardless).</div>
        </>
      )
      break
    case 6:
      popupElementId = 'letter-13'
      popupBody = (
        <>
          <div>Another example - this letter gains extra points if it is the first letter in the word.</div>
          <div>If you are unsure what an ability does - click / tap on the letter once to see more detail.</div>
        </>
      )
      break
    case 7:
      popupElementId = 'letter-15'
      popupBody = (
        <>
          <div>In addition to the regular letters, usually you will also be able to also use "wild" letters.  These can be set to be any letter, but will not contribute any points towards the word score.</div>
          <div>To set / change a wild - click / tap on the letter once after it has been placed to choose a letter.</div>
          <div>Like the regular letters, you can buy as many as you want and can afford.</div>
        </>
      )
      break
    case 8:
      popupBody = (
        <>
          <div>Have a go at solving this tutorial puzzle.  As with all puzzles you are aiming to find the best combination of letters that score highest, but also makes a valid word.</div>
          <div>Hint: consider the abilities and how best to use them</div>
        </>
      )
      break
  }

  const handleClose = () => {
    setMessageIndex(messageIndex + 1)
  }

  if (messageIndex >= 9) {
    return null
  }

  return (
    <Popup key={messageIndex} className="tutorial-message" onClose={handleClose} elementId={popupElementId}>
      { popupBody }
    </Popup>
  )
})