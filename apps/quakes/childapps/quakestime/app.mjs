import MainView from './MainView.mjs';

export const onStart = () => Neo.app({
    mainView: MainView,
    name    : 'QuakesTime'
});