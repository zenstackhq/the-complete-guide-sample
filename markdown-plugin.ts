import {
    ZModelCodeGenerator,
    getLiteral,
    type PluginOptions,
} from '@zenstackhq/sdk';
import {
    isDataModel,
    type DataModel,
    type DataModelAttribute,
    type Model,
} from '@zenstackhq/sdk/ast';
import fs from 'fs';

export const name = 'Markdown';

export default async function run(model: Model, options: PluginOptions) {
    // process options
    const title = options.title ?? 'My Application Model';
    const description = options.description ?? 'Description of my application';

    // get all data models
    const dataModels = model.declarations.filter((x): x is DataModel =>
        isDataModel(x)
    );

    // TOC
    const toc = dataModels.map((x) => `- [${x.name}](#${x.name})`).join('\n');

    // data model docs
    const dataModelDocs = generateDataModelDocs(dataModels);

    fs.writeFileSync(
        'schema.md',
        `# ${title}
    
${description}
    
${toc}
    
${dataModelDocs}
    `
    );
}

function generateDataModelDocs(dataModels: DataModel[]) {
    // AST -> ZModel source generator
    const zmodelCodeGen = new ZModelCodeGenerator();

    // all CRUD operations
    const CRUD = ['create', 'read', 'update', 'delete'];

    const docs = dataModels.map((dataModel) => {
        // first, group model attributes by CRUD operations
        const groupByCrud = dataModel.attributes
            .filter((attr) =>
                ['@@allow', '@@deny'].includes(attr.decl.ref?.name || '')
            )
            .reduce<Record<string, DataModelAttribute[]>>((group, attr) => {
                const ops = getLiteral<string>(attr.args[0].value);
                if (ops) {
                    const splitOps =
                        ops == 'all'
                            ? CRUD
                            : ops.split(',').map((op) => op.trim());

                    splitOps.forEach((op) => {
                        group[op] = group[op] || [];
                        group[op].push(attr);
                    });
                }

                return group;
            }, {});

        // then generate rules for each operation
        const policies = CRUD.map((op) => {
            const rules = groupByCrud[op]
                ? groupByCrud[op]
                      // output `@@deny` before `@@allow`
                      .sort((a) => {
                          return a.decl.ref?.name == '@@deny' ? -1 : 1;
                      })
                      .map(
                          (attr) =>
                              `  - ${
                                  attr.decl.ref?.name == '@@deny'
                                      ? '❌ '
                                      : '✅ '
                              }${zmodelCodeGen.generate(attr.args[1].value)}`
                      )
                      .join('\n')
                : [];

            return [`- ${op.toUpperCase()}`, rules].join('\n');
        }).join('\n');

        return `## ${dataModel.name}\n\n${policies}`;
    });

    return docs.join('\n\n');
}
