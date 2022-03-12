import './PlayerArea.css';

export const PlayerArea: React.FC = () => {
  return (
    <div className="player-area">
      <div className="player-area-background">
        { [...Array(8)].map((e, index) => (
          <div key={index} className="player-area-background-cell">
          </div>
        ))}
      </div>
    </div>
  )
}