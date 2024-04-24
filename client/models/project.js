import { Schema, model, models } from 'mongoose';

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
    wallet: {
        type: String,
    },
    currentFunds: {
        type: Number,
    },
    goal: {
        type: Number,
        required: [true, 'Project goal is required.'],
    },
    timeToFund: {
        type: String,
        required: [true, 'Funding end date is required.'],
    },
    createdAt: {
        type: String,
        required: [true, 'Creation date is required.'],
    },
    tag: {
        type: String,
        required: [true, 'Tag is required.'],
    },
    location: {
        type: String,
        required: [true, 'Location is required.'],
    },
    images: {
        type: [String],
        required: [true, 'Images are required'],
    }
});

export default models.Project || model('Project', ProjectSchema);