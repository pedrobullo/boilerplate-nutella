import revalidator from 'revalidator';

const eventSchema = {
  properties: {
    title: {
      description: 'Event Title',
      type: 'string',
      required: true,
      messages: {
        required: 'Title required.',
      },
    },
    date: {
      description: 'Event Date',
      type: 'date-time',
      required: true,
      messages: {
        required: 'Date required',
      },
    },
    location: {
      description: 'Description',
      type: 'object',
      allowEmpty: true,
      messages: {
        type: 'Wrong location.',
      },
    },
  },
};

const postValidation = data => revalidator.validate(data, eventSchema);

export { postValidation };
