import React, { useEffect } from 'react';
import { Segment } from 'semantic-ui-react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';

import { getUserDetails } from '../../redux/ducks/user';
import { getData, updateData } from '../../redux/ducks/data';
import ListForm from '../../components/ListForm/ListForm';

import styles from './MainPage.module.scss';

const MainPage = () => {
  const dispatch = useDispatch();
  const { data } = useSelector((state) => state.data, shallowEqual);
  const { userId, groupId } = useSelector((state) => state.user, shallowEqual);

  useEffect(() => {
    dispatch(getUserDetails());
  }, [dispatch]);

  useEffect(() => {
    if (userId && groupId && !data) {
      dispatch(getData(userId, groupId));
    }
  }, [userId, groupId, data, dispatch])

  const handleUpdatePros = (newData) => {
    const payload = {
      cros: newData,
      pros: data ? data.pros : [],
    };

    dispatch(updateData(userId, groupId, payload));
  }

  const handleUpdateCons = (newData) => {
    const payload = {
      pros: data ? data.pros : [],
      cons: newData,
    };

    dispatch(updateData(userId, groupId, payload));
  }

  return (
    <Segment id={styles.application_wrapper}>
      <div className={styles.application_title}>Should I ... ?</div>

      <div className={styles.block_container}>
        <ListForm
          headerText="Pro's"
          placeholder="New Pro's"
          data={data ? data.pros : []}
          handleUpdate={handleUpdatePros}/>

        <ListForm
          headerText="Con's"
          placeholder="New Con's"
          data={data ? data.cons : []}
          handleUpdate={handleUpdateCons}/>
      </div>
    </Segment>
  )
}

export default MainPage;