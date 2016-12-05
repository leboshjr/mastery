const RouteGeneratorBaseGeneral = requireF('services/_core/generators/routes/base/RouteGeneratorBaseGeneral');
const HandlerGeneratorCreate = requireF('services/_core/generators/handler/HandlerGeneratorCreate');

export default class RouteGeneratorCreate extends RouteGeneratorBaseGeneral {
  constructor(model) {
    const methodName = 'create';
    const handlerGenerator = new HandlerGeneratorCreate(model);

    super({
      handler: handlerGenerator.handler,
      methodName,
      model,
    });

    this.method = 'PUT';
    this.path = model.name;
  }
}