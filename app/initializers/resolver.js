import Resolver from 'ember/resolver';

export default {
  name: 'resolver',
  initialize: function(container, application) {
    container.optionsForType("look", {instantiate: true});
    container.optionsForType("renderer", {instantiate: true});
  }
}
