"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LetterShop = void 0;
require("./styles/LetterShop.css");
const mobx_react_lite_1 = require("mobx-react-lite");
const react_1 = require("react");
const GameContext_1 = require("../../../stores/GameContext");
const DraggableLetter_1 = require("./DraggableLetter");
const Letter_1 = require("./Letter");
exports.LetterShop = (0, mobx_react_lite_1.observer)(() => {
    const { getIsLetterUsed, inventory, secretShopLetters, shopLetters, onQuickAddLetter } = (0, react_1.useContext)(GameContext_1.GameContext);
    return (<div className="shop-container">
      {shopLetters.map((shopLetter, index) => {
            const className = 'shop-letter-container shop-letter-char-' + (shopLetter.char || 'empty');
            return (<div key={index} className={className} onDoubleClick={() => onQuickAddLetter(shopLetter)}>
            <div className="shop-letter-price">
              {'$' + shopLetter.price}
            </div>
            <DraggableLetter_1.DraggableLetter letter={shopLetter}/>
          </div>);
        })}
      {secretShopLetters.map((shopLetter, index) => (<div key={index} className="shop-letter-container secret-letter" onDoubleClick={() => onQuickAddLetter(shopLetter)}>
          <div className="shop-letter-price">
            {'$' + shopLetter.price}
          </div>
          <DraggableLetter_1.DraggableLetter letter={shopLetter} label="Secret"/>
        </div>))}
      {inventory.map((inventoryLetter, index) => {
            const classNames = 'inventory-letter-container inventory-letter-' + (index + 1);
            return (<div key={index} className={classNames} onDoubleClick={() => onQuickAddLetter(inventoryLetter)}>
            {getIsLetterUsed(inventoryLetter) ? (<Letter_1.Letter letter={inventoryLetter} disabled/>) : (<DraggableLetter_1.DraggableLetter letter={inventoryLetter} label="Saved"/>)}
          </div>);
        })}

    </div>);
});
//# sourceMappingURL=LetterShop.js.map