# Code Next - Emoji Search Project

[Fork on StackBlitz ⚡️](https://stackblitz.com/fork/code-next-emoji-search)

This is a lesson for the [Code Next](https://codenext.withgoogle.com/) React club.

In this lesson, engineers will

- practice React fundamentals by making a simple Emoji search app

## Make the skeleton

The emoji app consists of:

- header
- input
- results

Make a dummy component for each of these things. Remember a dummy component just renders a div of the components name. For example:

```jsx
export const Dummy = () => <div>Dummy</div>;
```

Solution

_App.js_

```jsx
export default function App() {
  return (
    <div>
      <Header />
      <Input />
      <Results />
    </div>
  );
}
```

Before moving on, make sure these components render as you expect.

## Flesh out the Header

The header is purely presentational. Pick 2 emojis and get the imgs using the `./util/getSrc` function. Remember that emojis are strings!

Solution

_Header.js_

```jsx
import { getSrc } from './util/getSrc';

const EMOJI1_SRC = getSrc('😈');
const EMOJI2_SRC = getSrc('👿');

export const Header = () => {
  <header>
    <h1>
      <img src={EMOJI1_SRC} width={32} height={32} />
      Emoji Search
      <img src={EMOJI1_SRC} width={32} height={32} />
    </h1>
  </header>
};
```

Feel free to customize it as you want. When you're finished, be sure to commit your work.

## What state do we need? Where should it live?

Take a look at `./data/ALL_EMOJIS.json`. When we search through this giant array, what data do we care about?

What components need to access that data?

Answer:

We can store each element in the array that matches a search query. Therefore, there's 2 pieces of data:

- `query` (string)
- `emojiResults` (array of emoji objects from `./data/ALL_EMOJIS.json`)

The `query` data needs to be accessed by the `<Input>` and the `<App>` components. Whenever the `query` changes, we want to create a side effect to update the `emojiResults`.

The `emojiResults` data is managed by the `<App>` component. We also want to pass it to the `<Results>` component, so that we can render them into something more meaningful.

Let's update the `<App>` component to contain this state.

Solution

_App.js_

```jsx
export default function App() {
  const [emojis, setEmojis] = useState([]);
  const [query, setQuery] = useState('');

  return (
    <div>
      <Header />
      <Input query={query} />
      <Results emojis={emojis} />
    </div>
  );
}
```

## Flesh out the Input

Whenever the input value changes, we need to let its parent `<App>` know. Remember that we allow child-to-parent communication by passing a function. Let's update the `<App>` component to have an event handler that updates the query.

Solution

_App.js_

```jsx
export default function App() {
  const [emojis, setEmojis] = useState([]);
  const [query, setQuery] = useState('');

  const onInputChange = (e) => {
    setQuery(e.target.value);
  };

  return (
    <div>
      <Header />
      <Input value={query} onChange={onInputChange} />
      <Results emojis={emojis} />
    </div>
  );
}
```

>NOTE: When accessing the `query` from inside the `<Input>` component, we use the `value` prop. Similarly, the change handler is accessed using the `onChange` prop.

Now, we need to use the `onChange` prop in the `<Input>` component.

Solution

_Input.js_

```jsx
export const Input = (props) => {
  return (
    <div class="input-group">
      <input type="text" class="form-control" value={props.value} onChange={props.onChange} />
    </div>
  );
};
```

## Create a search function

Cool, so now we have a way to update the `query` variable. Let's react to it using the `useEffect` hook. The first argument is the callback, and the second argument is a list of dependencies - the things that trigger changes. For now, let's import the search function and log the results. This search function is not fleshed out, so it won't return anything meaningful.

Solution

_App.js_

```jsx
import * as EmojiAPI from './data/EmojiAPI';

export default function App() {
  const [emojis, setEmojis] = useState([]);
  const [query, setQuery] = useState('');

  const onInputChange = (e) => {
    setQuery(e.target.value);
  };

  // This will be called whenever query changes.
  useEffect(() => {
    const nextEmojis = EmojiAPI.search(query, 20);
    console.log(query, nextEmojis);
  }, [query])

  return (
    <div>
      <Header />
      <Input value={query} onChange={onInputChange} />
      <Results emojis={emojis} />
    </div>
  );
}
```

Hand test your side effect by updating the `query` by typing into the input. What do you expect to see? What did you see?

## Flesh out the fake search API

Open `./data/EmojiAPI` and you will see an empty `search` function. This is supposed to act as a fake call to an API to an imaginary server. The entire emoji array is exposed via the `ALL_EMOJIS` variable.

Before you code, determine a strategy to filter the `ALL_EMOJIS` array to only get the ones that match the `query` and only return a max limit of `limit`.

Solution:

Think of the `ALL_EMOJIS` array as a stream:

emojis -> select emojis whose title OR keywords is included in `query` -> select up to `limit` emojis

Now, express that in code. Take a look at:

- `Array.prototype.filter` ([docs](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter))
- `String.prototype.includes` ([docs](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/includes)):
- `Array.prototype.slice` ([docs](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/slice))

Solution:

```jsx
import ALL_EMOJIS from './ALL_EMOJIS.json';

export const search = (query, limit) => {
  // normalize query
  query = query.toLowerCase();

  return ALL_EMOJIS.filter(emoji => {
    // normalize title
    const title = emoji.title.toLowerCase();

    // normalize keywords
    const keywords = emoji.keywords.toLowerCase();

    // select emojis whose title includes query OR keywords includes query
    return title.includes(query) || keywords.includes(query);
  }).slice(0, limit); // select up to limit emojis
};
```

Now that we have a working search mechanism, change `query` and see if you get an array of emojis. If so, we can update our effect to set the `emojis` array.

Solution:

_App.js_

```jsx
import * as EmojiAPI from './data/EmojiAPI';

export default function App() {
  const [emojis, setEmojis] = useState([]);
  const [query, setQuery] = useState('');

  const onInputChange = (e) => {
    setQuery(e.target.value);
  };

  // This will be called whenever query changes.
  useEffect(() => {
    const nextEmojis = EmojiAPI.search(query, 20);
    console.log(query, nextEmojis);
    setEmojis(nextEmojis);
  }, [query]);

  return (
    <div>
      <Header />
      <Input value={query} onChange={onInputChange} />
      <Results emojis={emojis} />
    </div>
  );
}
```

## Flesh out the Results

Great! We're almost there. Now, let's render the results. Remember that we can get an image `src` using `./util/getSrc`. For each `<li>` element, use the `emoji.title` as the key, assuming that they're unique.

```jsx
export const Results = (props) => {
  return (
    <ul className="list-group">
      {props.emojis.map(emoji => (
        <li
          key={emoji.title}
          className="list-group-item list-group-item-action"
        >
          <img src={getSrc(emoji.symbol)} width={32} height={32} />
          &nbsp;
          {emoji.title}
        </li>
      ))}
    </ul>
  );
};
```

At this point, your emoji search should be working. Test a few queries to validate this! You can also edit `./data/ALL_EMOJIS.json` with interesting keywords to further hand test it.

## Make each row copyable

Take a look at `./hooks/useClipboard` hook. It doesn't return anything, and purely just gives a side effect. The `querySelector` argument is a string that is a CSS query selector. You can read more about them [here](https://developer.mozilla.org/en-US/docs/Web/API/Document/querySelector).

In order to tell the Clipboard library _what_ to copy, we need to set `data-clipboard-text` on the element that matches the query selector. You can read more about it [here](https://clipboardjs.com/).

Update the `<Results>` component to install a clipboard listener on each list item.

Solution:

```jsx
export const Results = (props) => {
  useClipboard('.copy-to-clipboard');

  return (
    <ul className="list-group">
      {props.emojis.map(emoji => (
        <li
          key={emoji.title}
          className="copy-to-clipboard list-group-item list-group-item-action"
          data-clipboard-text={emoji.symbol}
        >
          <img src={getSrc(emoji.symbol)} width={32} height={32} />
          &nbsp;
          {emoji.title}
        </li>
      ))}
    </ul>
  );
};

```