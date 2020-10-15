// @flow
import * as React from 'react';

type Item = {
  id: number | string,
  text: string
}

type Props = {
  title: string,
  items: Item[],
  onSelectItem: (item: Item) => void
}

class TodoListClass extends React.Component<Props> {

  /**
   * According to documentation this should work!
   */
  static defaultProps = {
    onSelectItem: (item: Item) => { }
  }

  // This should work 
  onClickInItem(item: Item) {
    this.props.onSelectItem(item);
  }

  render(): React.Node {
    const itemListComponent = this.props.items.map(item => {
      return (
        <li key={item.id} onClick={() => this.onClickInItem(item)}>
          {item.text}
        </li>
      );
    });

    return (
      <div>
        <h3>{this.props.title}</h3>

        <ul>
          {itemListComponent}
        </ul>
      </div>
    );
  }
}

export default TodoListClass;
