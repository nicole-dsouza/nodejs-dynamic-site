var fs = require("fs");



function mergeValues(values, content) {
    for (var key in values) {
        content = content.replace(`{{${key}}}`, values[key]);
    }
    return content;
}

function view(template_name, values, response) {

    // read html template
    const file_name = `./views/${template_name}.html`;
    let file_data = fs.readFileSync(file_name, { encoding: 'utf-8' });

    // merge in values
    file_data = mergeValues(values, file_data);

    // write to response
    response.write(file_data);

}

module.exports.view = view;