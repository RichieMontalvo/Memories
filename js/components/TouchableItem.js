import {Platform, TouchableNativeFeedback,TouchableOpacity, TouchableWithoutFeedback} from 'react-native';

const TouchableItem = Platform.OS === 'ios' ? TouchableOpacity : TouchableWithoutFeedback;

export default TouchableItem