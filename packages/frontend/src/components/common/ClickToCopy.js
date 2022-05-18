import React, { useState } from 'react';
import { Translate } from 'react-localize-redux';
import styled from 'styled-components';

import { Mixpanel } from '../../mixpanel/index';
import classNames from '../../utils/classNames';

const Container = styled.div`
    position: relative;
    cursor: copy;

    .copy-success {
        position: absolute;
        left: 50%;
        transform: translate(-50%, 0);
        text-align: center;
        background-color: #8DECC6;
        color: #005A46;
        border-radius: 4px;
        padding: 6px 8px;
        font-size: 13px;
        top: -24px;
        opacity: 0;
        pointer-events: none;
        transition: 200ms;
        font-weight: 400;
    }

    &.show {
        .copy-success {
            top: -32px;
            opacity: 1;
        }
    }
`;

const ClickToCopy = ({ className, children, copy, successTranslation = 'default' }) => {
    const [show, setShow] = useState(false);

    const handleCopy = () => {
        Mixpanel.track('Click to copy text');
        setShow(true);
        setTimeout (() => setShow(false), 2000);
        const input = document.createElement('textarea');
        input.innerHTML = copy;
        document.body.appendChild(input);
        input.select();
        const result = document.execCommand('copy');
        document.body.removeChild(input);
        return result;
    };

    return (
        <Translate>
            {({ translate }) =>
                <Container
                    title={translate('copy.title')}
                    className={classNames([className, show ? 'show' : ''])}
                    onClick={handleCopy}
                >
                    {children}
                    <div className='copy-success'>
                        <Translate id={`copy.${successTranslation}`}/>
                    </div>
                </Container>
            }
        </Translate>
    );
};

export default ClickToCopy;
