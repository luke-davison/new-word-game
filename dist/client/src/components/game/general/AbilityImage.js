"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AbilityImage = void 0;
const mobx_react_lite_1 = require("mobx-react-lite");
const getAbilityImage_1 = require("../../../utils/getAbilityImage");
exports.AbilityImage = (0, mobx_react_lite_1.observer)(props => (<img src={(0, getAbilityImage_1.getAbilityImage)(props.ability)} alt=""/>));
//# sourceMappingURL=AbilityImage.js.map