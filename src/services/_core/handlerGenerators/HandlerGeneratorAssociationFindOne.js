import _ from 'lodash';
import Boom from 'boom';

/**
 * Generate the findOne handler of an association of belongsTo/hasOne
 *
 * @export
 * @class HandlerGeneratorAssociationFindOne
 */
export default class HandlerGeneratorAssociationFindOne {
  /**
   * Creates an instance of HandlerGeneratorAssociationFindOne.
   *
   * @param {Sequelize.Model} model
   * @param {string} componentId
   * @param {Sequelize.Model.Association} association
   *
   * @memberOf HandlerGeneratorAssociationFindOne
   */
  constructor(model, componentId, association) {
    this.model = model;
    this.componentId = componentId;
    this.association = association;
    this.permissions = [`${componentId}:${association.as}:findOne`];
  }

  /**
   * HapiJS route handler
   *
   * @memberOf HandlerGeneratorAssociationFindOne
   */
  handler = async (request, reply) => {
    try {
      const modelInstance = await this.model.findById(request.params.id);
      if (!modelInstance) {
        return reply(Boom.notFound());
      }
      const expectedMethodName = `get${_.upperFirst(_.camelCase(this.association.as))}`;
      const result = await modelInstance[expectedMethodName]();
      return reply(result.toJSON());
    } catch (e) {
      return reply(Boom.badRequest(e));
    }
  }
}
