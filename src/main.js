import "./set-public-path";
import Vue from "vue";
import singleSpaVue from "single-spa-vue";
import vuetify from "@/plugins/vuetify"; // path to vuetify export

import App from "./App.vue";

Vue.config.productionTip = false;

const appOpts = {
  vuetify,
};

const vueLifecycles = singleSpaVue({
  Vue,
  appOptions: {
    render(h) {
      return h(App, {
        props: {
          // single-spa props are available on the "this" object. Forward them to your component as needed.
          // https://single-spa.js.org/docs/building-applications#lifecycle-props
          // if you uncomment these, remember to add matching prop definitions for them in your App.vue file.
          /*
          name: this.name,
          mountParcel: this.mountParcel,
          singleSpa: this.singleSpa,
          */
        },
      });
    },
    ...appOpts,
  },
});

export const bootstrap = vueLifecycles.bootstrap;
export const mount = vueLifecycles.mount;
export const unmount = vueLifecycles.unmount;

export const Sidebar = App;

function bindSlotContext(target = {}, context) {
  const r = Object.keys(target).map((key) => {
    const vnode = target[key];
    vnode.context = context;
    return vnode;
  });

  return r;
}

export function intoVue3(WrapperComponent, wrapperId) {
  let vm;
  return {
    mounted() {
      const slots = bindSlotContext(this.$slots, this.__self);
      vm = new Vue({
        render: (createElement) => {
          return createElement(
            WrapperComponent,
            {
              on: this.$attrs,
              attrs: this.$attrs,
              props: this.$props,
              scopedSlots: this.$scopedSlots,
            },
            slots
          );
        },
        ...appOpts,
      });
      vm.$mount(`#${wrapperId}`);
    },
    props: WrapperComponent.props,
    render() {
      vm && vm.$forceUpdate();
    },
  };
}
