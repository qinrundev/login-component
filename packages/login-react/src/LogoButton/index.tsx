import React, { useState } from 'react';

const Index: React.FC<{ logo: any, showModal: any, type :string }> = (props: any) => {
    const [mouseEnter, setMouseEnter] = useState(false);
    return (
        <div
            style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'column',
                height: 48,
                width: 56,
                border: '1px solid #D4D8DD',
                borderRadius: '10%',
                backgroundColor: mouseEnter ? '#E8E8E8' : '#F8F8F8',
            }}
            onMouseEnter={() => setMouseEnter(true)}
            onMouseLeave={() => setMouseEnter(false)}
            onClick={() => { props.showModal(true,props.type) }}
        >
            {props.logo}
        </div>

    );
};
export default Index;
