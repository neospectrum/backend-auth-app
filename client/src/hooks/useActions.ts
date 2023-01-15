import { rootActions } from './../store/store';
import { bindActionCreators } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';

export const useActions = () => {
    const dispatch = useDispatch();

    return bindActionCreators(rootActions, dispatch);
};
