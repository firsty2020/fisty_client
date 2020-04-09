import React from 'react';

export default function PageContent({children}) {
    return (
        <div id="primary-content" tabIndex="-1" role="main">
            {children}
        </div>
    );
}
