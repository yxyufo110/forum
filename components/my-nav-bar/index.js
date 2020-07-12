import { getNav } from '../../services/user';

Component({
  options: {
    styleIsolation: 'shared',
  },
  data: {
    tabsList: [],
    active: '',
  },
  properties: {
    title: {
      type: String,
      value: '考粉驿站',
    },
    showLeft: {
      type: Boolean,
      value: true,
    },
    showHome: {
      type: Boolean,
      value: false,
    },
    showTabs: {
      type: Boolean,
      value: false,
    },
  },
  lifetimes: {
    attached: function () {
      if (this.data.showTabs) {
        getNav().then((res) => {
          this.setData({
            tabsList: res,
            active: res.find((i) => i.purchased === true).id,
          });
          this.triggerEvent(
            'getTabItem',
            res.find((i) => i.purchased === true),
          );
        });
      }
    },
  },
  methods: {
    onClick: function (e) {
      this.triggerEvent(
        'getTabItem',
        this.data.tabsList.find((i) => i.id === e.detail.name),
      );
      this.setData({
        active: e.detail.name,
      });
    },
  },
});
