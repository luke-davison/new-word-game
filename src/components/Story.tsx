import { observer } from 'mobx-react-lite';
import { FunctionComponent } from 'react';

export const Story: FunctionComponent = observer(() => {
  return (
    <div className="game-story">
      <div className="game-story-title">
        The story so far
      </div>
      <div className="game-story-main">
        <p>The year is 592.  Your mother, Gertrude Macadamia, has sent you down to the shops on your bicycle to purchase some letters from the local lettermonger.  His name is Argus McArguston - a rude old man who smells faintly of rotten apples.</p>
        <p>"Good morning young master Bi," Argus says rudely as you enter, ignoring your desire to shop quietly and without conversation.  "Has your mother finally decided that her son should have a proper name of more than two letters?</p>
        <p>"No sir," you reply.</p>
        <p>Ever since you can remember you've hated your name.  But with money being tight at the moment that was all the letters your family could afford.  Or so your mother said.  Money didn't appear to be an issue when your younger sister Jacqueline was born.</p>
      </div>
      <div className="game-story-fade">
        <p>Blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah</p>
      </div>
      <div className="game-story-extra">
        <p>"Why does a word game need a story?" you wonder to yourself.  "Does the creator think I will be more engaged if I can relate to the characters?"</p>
        <p>"Wait - why is there even characters?  With such specific names too."</p>
        <p>"And why am I continuing to read this?"</p>
        <p>However you quickly decide not to bother spending any time wondering these questions and you click back to the game and resume playing.  Later you will rate the game five stars in the app store.  You would have given it four stars but the story told you it had to be five.</p>
      </div>
    </div>
  )
})