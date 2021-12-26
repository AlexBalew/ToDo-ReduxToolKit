import React, { ChangeEvent, KeyboardEvent, useState } from 'react';

import { AddBox } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import TextField from '@mui/material/TextField';

export type AddItemFormPropsType = {
  callback: (title: string) => void;
  disabled?: boolean;
  label?: string;
};

export const AddItemForm = React.memo(
  ({ callback, disabled = false, label = 'new task title' }: AddItemFormPropsType) => {
    const [title, setTitle] = useState('');
    const [error, setError] = useState('');

    const onChangeNewTaskTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
      setTitle(e.currentTarget.value);
    };
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
      if (error !== null) {
        setError('');
      }
      if (e.key === 'Enter' && title.trim() !== '') {
        callback(title);
        setTitle('');
      }
      if (e.key === 'Enter' && title.trim() === '') {
        setError('Insert Title');
      }
    };

    const addTaskButton = () => {
      if (title.trim() !== '') {
        callback(title);
        setTitle('');
      } else {
        setError('Insert new title');
      }
    };

    return (
      <div style={{ height: '50px' }}>
        <TextField
          disabled={disabled}
          size="small"
          variant="outlined"
          value={title}
          onChange={onChangeNewTaskTitleHandler}
          onKeyPress={onKeyPressHandler}
          error={!!error}
          label={label || 'Title'}
          helperText={error}
          style={{ background: '#FFFFFF', borderRadius: 5 }}
        />
        <IconButton
          color="secondary"
          size="small"
          onClick={addTaskButton}
          disabled={disabled}
        >
          <AddBox />
        </IconButton>
      </div>
    );
  },
);
