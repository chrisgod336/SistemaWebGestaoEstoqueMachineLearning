import React from 'react';
import { useMemo } from 'react';
import { Formik } from 'formik';
import * as yup from 'yup';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';

interface FieldConfig {
  label: string;
  type: 'text' | 'select' | 'email' | 'cpf_cnpj' | 'number';
  value: any;
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  options?: { label: string; value: any }[];
  mask?: (value: any) => string;
  readonly?: boolean;
}

interface BootstrapFormProps {
  fields: Record<string, FieldConfig>;
  isNew: boolean;
  onCreate: (values: any) => void;
  onSave: (values: any) => void;
  onDelete: () => void;
  onNew: () => void;
  iframe?: string | false;
}

const BootstrapForm: React.FC<BootstrapFormProps> = ({
  fields,
  isNew,
  onCreate,
  onSave,
  onDelete,
  onNew,
  iframe=false
}) => {
  const initialValues = useMemo(() => {
    return Object.keys(fields).reduce((acc, key) => {
      acc[key] = fields[key].value ?? '';
      return acc;
    }, {} as Record<string, any>);
  }, [fields]);
  
  const schema = yup.object().shape(
    Object.keys(fields).reduce((acc, key) => {
      const field = fields[key];
      let validator: yup.StringSchema<any> = yup.string();

      if (field.type === 'email') {
        validator = validator.email('E-mail inválido');
      }

      if (field.required) {
        validator = validator.required('Campo obrigatório');
      }

      if (field.minLength) {
        validator = validator.min(field.minLength, `Mínimo de ${field.minLength} caracteres`);
      }

      if (field.maxLength) {
        validator = validator.max(field.maxLength, `Máximo de ${field.maxLength} caracteres`);
      }

      if (field.type === 'cpf_cnpj') {
        validator = validator.test('cpf_cnpj', 'CPF ou CNPJ inválido', (value = '') => {
          const cleanValue = value.replace(/[^\d]+/g, '');
          return isValidCPF(cleanValue) || isValidCNPJ(cleanValue);
        });
      }

      acc[key] = validator;
      return acc;
    }, {} as Record<string, yup.StringSchema<any>>)
  );

  const isValidCPF = (cpf: string) => {
    cpf = cpf.replace(/[^\d]+/g, '');
    if (cpf.length !== 11 || /^(\d)\1+$/.test(cpf)) return false;
  
    let sum = 0;
    for (let i = 0; i < 9; i++) sum += parseInt(cpf.charAt(i)) * (10 - i);
    let rest = (sum * 10) % 11;
    if (rest === 10 || rest === 11) rest = 0;
    if (rest !== parseInt(cpf.charAt(9))) return false;
  
    sum = 0;
    for (let i = 0; i < 10; i++) sum += parseInt(cpf.charAt(i)) * (11 - i);
    rest = (sum * 10) % 11;
    if (rest === 10 || rest === 11) rest = 0;
    return rest === parseInt(cpf.charAt(10));
  };
  
  const isValidCNPJ = (cnpj: string) => {
    cnpj = cnpj.replace(/[^\d]+/g, '');
    if (cnpj.length !== 14 || /^(\d)\1+$/.test(cnpj)) return false;
  
    let length = cnpj.length - 2;
    let numbers = cnpj.substring(0, length);
    let digits = cnpj.substring(length);
    let sum = 0;
    let pos = length - 7;
  
    for (let i = length; i >= 1; i--) {
      sum += parseInt(numbers.charAt(length - i)) * pos--;
      if (pos < 2) pos = 9;
    }
  
    let result = sum % 11 < 2 ? 0 : 11 - (sum % 11);
    if (result !== parseInt(digits.charAt(0))) return false;
  
    length += 1;
    numbers = cnpj.substring(0, length);
    sum = 0;
    pos = length - 7;
  
    for (let i = length; i >= 1; i--) {
      sum += parseInt(numbers.charAt(length - i)) * pos--;
      if (pos < 2) pos = 9;
    }
  
    result = sum % 11 < 2 ? 0 : 11 - (sum % 11);
    return result === parseInt(digits.charAt(1));
  };
  

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={schema}
      onSubmit={(values) => {
        isNew ? onCreate(values) : onSave(values);
      }}
      enableReinitialize={true}
    >
      {({ handleSubmit, handleChange, values, errors, setFieldValue }) => (
        <Form noValidate onSubmit={handleSubmit}>
          <Row className="mb-3">
            {Object.entries(fields).map(([name, field]) => (
              <Form.Group
                as={Col}
                md="6"
                key={name}
                controlId={`field-${name}`}
                className="position-relative"
              >
                <Form.Label>{field.label}</Form.Label>

                {field.type === 'select' && field.options ? (
                  <Form.Select
                    name={name}
                    value={values[name]}
                    onChange={handleChange}
                    isInvalid={!!errors[name]}
                    disabled={field.readonly}
                  >
                    <option value="">Selecione...</option>
                    {field.options.map((opt) => (
                      <option key={opt.value} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </Form.Select>
                ) : (
                  <Form.Control
                    type={
                      field.type === 'email'
                        ? 'email'
                        : field.type === 'number'
                        ? 'number'
                        : 'text'
                    }
                    name={name}
                    value={values[name]}
                    onChange={(e) => {
                      if (!field.readonly) {
                        let value: any = e.target.value;
                        if (field.type === 'number') {
                          value = e.target.value === '' ? '' : Number(e.target.value);
                          if(value==0){
                            value=1;
                          }
                          if(field.mask){
                            field.mask(value);
                          }
                          
                        } else if (field.mask) {
                          value = field.mask(value);
                        }
                        setFieldValue(name, value);
                      }
                    }}
                    isInvalid={!!errors[name]}
                    placeholder={field.label}
                    readOnly={field.readonly}
                    className={field.readonly ? 'bg-light text-muted' : ''}
                  />

                )}

                <Form.Control.Feedback type="invalid" tooltip>
                  {errors[name] as string}
                </Form.Control.Feedback>
              </Form.Group>
            ))}
          </Row>
            {
              (!isNew && iframe)?
              <iframe src={iframe} width='100%' height='300x' style={{border: 'solid 1px gray', borderRadius: 10}}/>
              :null
            }
          {isNew ? (
            <Button type="submit" variant="success">
              Incluir
            </Button>
          ) : (
            <div className="d-flex gap-2">
              <Button type="submit" variant="primary">
                Salvar
              </Button>
              <Button variant="danger" onClick={onDelete}>
                Excluir
              </Button>
              <Button variant="success" onClick={onNew}>
                Novo
              </Button>
            </div>
          )}
        </Form>
      )}
    </Formik>
  );
};

export default BootstrapForm;
