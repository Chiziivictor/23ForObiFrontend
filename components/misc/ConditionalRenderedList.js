import styles from './Styles.module.scss'
import { useState, useEffect } from 'react';

const ConditionalRenderedList = ({
  value,
  villages,
  setValue,
  toggle,
  setSelectedVillage,
  setToggle,
  setIsVillageEmpty,
}) => {
  const others = {
    id: 999,
    name: 'Others',
  };

  const addVillage = [
    {
      id: 999,
      name: 'Add first village',
    },
  ];

  const [villageList, setVillageList] = useState([]);

  // console.log(villageList);

  useEffect(() => {
    const newList = async () =>
      setVillageList(villages?.list_of_villages?.concat(others));
    newList();
  }, [villages]);

  useEffect(() => {
    // if (villageList === undefined) {
    //   setIsVillageEmpty(true)
    // } else {
    //   setIsVillageEmpty(false);
    // }
  }, [villageList]);
  
  const itemsList =
    villageList &&
    villageList.map((villageItems) => {
      const itemsss = {
        name: villageItems.name,
        value: villageItems.id,
      };
      return itemsss;
    });

  // console.log(value);
  if (value) {
    const filteredVillages = itemsList?.filter((item) =>
      item.name.toString().toLowerCase().startsWith(value.toLowerCase())
    );
    // console.log(filteredVillages);
    if (filteredVillages?.length) {
      return (
        toggle && (
          <div className={styles.village_dropdown}>
            {filteredVillages?.map((item) => (
              <div
                onClick={() => {
                  setToggle(false);
                  setValue(item.name);
                  setSelectedVillage(item);
                }}
                className={styles.dropdown_item}
              >
                {item.name}
              </div>
            ))}
          </div>
        )
      );
    }
    return (
      <div className={styles.not_found}>
        <div className={styles.dropdown_item}>
          <p>Not Found</p>
        </div>
      </div>
    );
  }

  return (
    toggle && (
      <div className={styles.village_dropdown}>
        {itemsList?.map((item) => (
          <div
            onClick={() => {
              setToggle(false);
              setValue(item.name);
              setSelectedVillage(item);
            }}
            className={styles.dropdown_item}
          >
            {item.name}
          </div>
        ))}
      </div>
    )
  );
};
export default ConditionalRenderedList