// @flow
import * as React from 'react';

export type Item = {
  id: string | number,
  text: string
}

export type Props = {
  title: string,
  items: Item[],
  onSelectItem: (item: Item) => void
};

const TodoList = (props: Props): React.Node => {

  const onClickInItem = (item: Item) => {
    props.onSelectItem(item);
  }

  const itemListComponent = props.items.map(item => {
    return (
      <li key={item.id} onClick={() => onClickInItem(item)}>
        {item.text}
      </li>
    );
  });

  return (
    <div>
      <h3>{props.title}</h3>

      <ul>
        {itemListComponent}
      </ul>
    </div>
  );
}

TodoList.defaultProps = {
  onSelectItem: (item: Item) => { }
}

export default TodoList;
