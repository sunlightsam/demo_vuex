function sync(store, router, options) {
  let moduleName = (options || {}).moduleName || 'route'

  store.registerModule(moduleName, {
    state: cloneRoute(router.currentRoute),
    mutations: {
      'router/ROUTE_CHANGED': function (state, transition) {
        store.state[moduleName] = cloneRoute(transition.to, transition.from)
      }
    }
  })

  let isTimeTraveling = false
  let currentPath

  // sync router on store change
  store.watch(
    function (state) {
      return state[moduleName]
    },
    function (route) {
      if (route.fullPath === currentPath) {
        return
      }
      isTimeTraveling = true
      currentPath = route.fullPath
      router.push(route)
    }, {
      sync: true
    }
  )

  // sync store on router navigation
  router.afterEach(function (to, from) {
    if (isTimeTraveling) {
      isTimeTraveling = false
      return
    }
    currentPath = to.fullPath
    store.commit('router/ROUTE_CHANGED', {
      to: to,
      from: from
    })
  })
}

function cloneRoute(to, from) {
  var clone = {
    name: to.name,
    path: to.path,
    hash: to.hash,
    query: to.query,
    params: to.params,
    fullPath: to.fullPath,
    meta: to.meta
  }
  if (from) {
    clone.from = cloneRoute(from)
  }
  return Object.freeze(clone)
}


const store = new Vuex.Store({
  getters: {
    route(state) {
      return state.route;
    },
    routeWithParams(state, getters) {
      let params = getters.route.params;
      console.log(params);
      return params;
    }
  }
});

let Test = Vue.extend({
  name: 'test',
  template: `<div>
  	{{$store.getters.routeWithParams}}
  </div>`
})

let Index = Vue.extend({
  name: 'index',
  template: `<button @click="$router.push({name: 'test', params: {test: 'test'}})"> Test</button>`
})

const router = new VueRouter({
  mode: 'history',
  routes: [{
      path: '/',
      component: Index
    },
    {
      path: '/test/:test',
      component: Test,
      name: 'test'
    }
  ]
})


sync(store, router);

new Vue({
  el: '#app',
  store,
  router,
})