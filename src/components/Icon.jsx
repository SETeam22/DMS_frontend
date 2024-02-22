import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as Icons from '@fortawesome/free-solid-svg-icons';

const Icon = ({ iconName }) => {
    const icon = Icons[iconName] ? Icons[iconName] : Icons.faQuestionCircle;
    return <FontAwesomeIcon icon={icon} style={{ color: 'white' }} />;
  };

  export default Icon;
