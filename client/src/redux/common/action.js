class cc {}

cc.systemError = (error) => {
    return {
        errors: {error}
    };
}

cc.action = (svcFunc, dispatch, types, target) => {
    console.log("facade");
    return cc.actionWithNotify(svcFunc, dispatch, types, null, target);
}

cc.actionWithNotify = (svcFunc, dispatch, types, notifyAction, target) => {
    console.log("facade");
    dispatch(cc.request(types.request, target));
    return svcFunc().then( (res) => cc.dispatchSuccess(res, types, notifyAction, dispatch, target))
                    .catch( (err) => cc.dispatchFailure(err, types, dispatch, target));        
}


cc.request = (type, target) => {
    return {
        type,
        target
    };
}

cc.dispatchSuccess = (res, types, notifyAction, dispatch, target) => {
    console.log("dispatchSuccess res=");
    console.dir(res);
    if(res.result==="OK") {
        const tmp=dispatch(cc.success(res.payload, types.success, target));
        if(notifyAction) {
            return dispatch( notifyAction(target) );
        }
        return tmp;
    }
    return dispatch(cc.failure(res, types.failure, target));
}

cc.success = (payload, type, target) => {
    return {
        type,
        payload,
        target
    };
}

cc.dispatchFailure = (err, types, dispatch, target) => {
    console.log("dispatchFailure err=");
    console.dir(err);

    const res = cc.systemError(err);
    return dispatch(cc.failure(res, types.failure, target));
}

cc.failure = ({errors}, type, target) => {
    return {
        type,
        errors,
        target
    };
}


cc.targetDestroy = (dispatch, type, target) => {
    console.log("targetDestroy target="+target);
    return dispatch( cc.destroy(type, target) );
}

cc.destroy = (type, target) => {
    return {
        type,
        target
    };
};



const CommonActionCreators = cc;

export default CommonActionCreators;