import { mixed, number, object, string, array } from 'yup';

export const AddProductValidation = object({
  type: string().min(4).required(),
  name: string().min(4).required(),
  description: string().min(4).required(),
  price: string().min(1).required(),
  cnt: string().min(1).required(),
  // file: mixed().required('File is required')
  file: mixed<File>()
    .required()
    .test('fileSize', 'file is too large', (value) => {
      console.log('*******', value);
      if (!value) {
        return true;
      }
      return value.size < 300000;
    }),
  info: array().of(
    object().shape({
      title: string(),
      description: string(),
      number: number(),
    })
  ),
});
