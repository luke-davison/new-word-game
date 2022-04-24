import { observer } from "mobx-react-lite";

export const LoadingScreen: React.FC = observer(() => {
  return (
    <div className="loading-screen">
      <span>Loading</span>
    </div>
  )
})