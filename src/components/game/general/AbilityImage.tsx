import { observer } from "mobx-react-lite"
import { FunctionComponent } from "react"
import { Abilities } from "../../../shared"
import { getAbilityImage } from "../../../utils/getAbilityImage"

interface IAbilityImageProps {
  ability: Abilities;
}

export const AbilityImage: FunctionComponent<IAbilityImageProps> = observer(props => (
  <img src={getAbilityImage(props.ability)} alt=""/>
))