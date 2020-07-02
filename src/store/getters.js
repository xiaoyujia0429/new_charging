const getters = {
  setloading: state => state.app.loading,
  token: state => state.user.token,
  name: state => state.user.name,
  // 以下是新页面的封装vuex
  newCollapseState: state => state.newherder.isCollapse,
  newAsideTitle: state => state.newherder.asideTitle,
  newactive: state => state.newherder.activeIndex,
  newCount: state => state.newherder.count,
  newCrumbs: state => state.newherder.crumbs,
  newNavs: state => state.newherder.nav
};
export default getters;
