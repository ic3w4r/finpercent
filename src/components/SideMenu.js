import React, { useState } from 'react';

const SideMenu = () => {
    const [isStockMarketMode, setIsStockMarketMode] = useState(false);

    const toggleStockMarketMode = () => {
        setIsStockMarketMode(!isStockMarketMode);
    };

    return (
        <div className="side-menu">
            <button onClick={toggleStockMarketMode}>
                {isStockMarketMode ? 'Disable Stock Market Mode' : 'Enable Stock Market Mode'}
            </button>
            {/* Add other menu items here */}
        </div>
    );
};

export default SideMenu;
