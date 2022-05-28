import { Input, Select } from 'antd';
import { useState } from 'react';

interface PhoneValue {
  cellphone: string;
  cellphoneNationCode: string;
}

interface PhoneInputProps {
  value?: PhoneValue;
  onChange?: (phone: PhoneValue) => void;
}

export const phonePrefixs = [
  { label: '+86', value: '86' }, // china mainland
  { label: '+852', value: '852' }, // Hong Kong
  { label: '+853', value: '853' }, // Macao
  { label: '+886', value: '886' }, // Taiwan
];

const PhoneInput: React.FC<PhoneInputProps> = ({ value, onChange }) => {
  const [cellphone, setCellphone] = useState('');
  const [code, setCode] = useState('86');

  return (
    <Input.Group compact>
      <Select
        style={{ width: '25%' }}
        value={value?.cellphoneNationCode || code}
        onChange={(v) => {
          setCode(v);
          if (onChange) {
            onChange({ cellphone, cellphoneNationCode: v });
          }
        }}
      >
        {phonePrefixs.map(item => (
          <Select.Option key={item.value} value={item.value}>
            {item.label}
          </Select.Option>
        ))}
      </Select>
      <Input
        style={{ width: '75%' }}
        value={value?.cellphone || cellphone}
        onChange={(e) => {
          setCellphone(e.target.value);
          if (onChange) {
            onChange({ cellphone: e.target.value, cellphoneNationCode: code });
          }
        }}
      />
    </Input.Group>
  )
};

export default PhoneInput;
