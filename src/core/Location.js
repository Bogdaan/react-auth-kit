import { canUseDOM } from 'fbjs/lib/ExecutionEnvironment';
import { browserHistory, createMemoryHistory } from 'react-router';

const location = canUseDOM ? browserHistory : createMemoryHistory();
export default location;
