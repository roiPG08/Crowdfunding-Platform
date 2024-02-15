const { Schema, model, models } = require('mongoose');

const ProjectSchema = new Schema({
    creator: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    project_name: {
        type: String,
        required: [true, 'Project name is required.'],
    },
    description: {
        type: String,
        required: [true, 'Project description is required.'],
    },
    goal: {
        type: Number,
        required: [true, 'Project goal is required.'],
    },
    tag: {
        type: String,
        required: [true, 'Tag is required.'],
    }
});

const project = models.Project || model('Project', ProjectSchema);

module.exports = {project};