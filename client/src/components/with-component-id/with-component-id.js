import React from 'react';
import shortid from "shortid";

export default function withComponentId(WrappedComponent) {
    return class extends React.Component  {
        _componentId = "";
        constructor(props) {
            super(props);
            this._componentId = shortid.generate();
        }

        render() {
            const p = {...this.props};
            if(!p.componentId) {
                p.componentId = shortid.generate();
            }
            return ( <WrappedComponent {...p} /> );
        }
    }
}
