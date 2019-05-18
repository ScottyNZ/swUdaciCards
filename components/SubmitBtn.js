import React from 'react';
import { BasicBtn } from './BasicBtn'


export function SubmitBtn({onPress}) {
  return (
    <BasicBtn
      btnLabel='SUBMIT'
      onPress={onPress}
    />
  );
}