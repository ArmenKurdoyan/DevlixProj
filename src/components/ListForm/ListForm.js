import React, { useState } from 'react';
import { Segment, Input, Icon } from 'semantic-ui-react';

import styles from './ListForm.module.scss';

const ListForm = ({ headerText, placeholder, data = [], handleUpdate }) => {
  const [newItem, setNewItem] = useState('');

  const handleAdd = () => {
    if (newItem) {
      handleUpdate([...data, newItem])
    }
  };

  const handleRemove = (index) => {
    handleUpdate(data.slice(0, index).concat(data.slice(index + 1, data.length)))
  }

  return (
    <Segment id={styles.list_block}>
      <div className={styles.title}>{headerText}</div>
      <div className={styles.items_section}>
        {
          data.map((value, index) => {
            return (
              <div className={styles.item} key={index}>
                <div>{value}</div>
                <Icon name="minus" onClick={() => handleRemove(index)} />
              </div>
            )
          })
        }
      </div>

      <div className={styles.add_item_section}>
        <Input 
          className={styles.input} 
          placeholder={placeholder} 
          onChange={(e, obj) => setNewItem(obj.value)} 
        />
        <Icon className={styles.add_icon} name="plus" onClick={handleAdd} />
      </div>
    </Segment>
  )
}

export default ListForm;