import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SIZES } from '../constants/colors';

interface CallInterfaceProps {
  callStatus: 'idle' | 'connecting' | 'ringing' | 'connected' | 'ended';
  isMuted: boolean;
  isSpeakerOn: boolean;
  onEndCall: () => void;
  onToggleMute: () => void;
  onToggleSpeaker: () => void;
}

export const CallInterface: React.FC<CallInterfaceProps> = ({
  callStatus,
  isMuted,
  isSpeakerOn,
  onEndCall,
  onToggleMute,
  onToggleSpeaker,
}) => {
  return (
    <View style={styles.container}>
      {callStatus === 'connected' && (
        <View style={styles.controls}>
          <TouchableOpacity
            style={[styles.button, isMuted && styles.buttonActive]}
            onPress={onToggleMute}
          >
            <Ionicons
              name={isMuted ? 'mic-off' : 'mic'}
              size={24}
              color={COLORS.white}
            />
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, isSpeakerOn && styles.buttonActive]}
            onPress={onToggleSpeaker}
          >
            <Ionicons
              name={isSpeakerOn ? 'volume-high' : 'volume-mute'}
              size={24}
              color={COLORS.white}
            />
          </TouchableOpacity>

          <TouchableOpacity style={styles.endButton} onPress={onEndCall}>
            <Ionicons name="call" size={24} color={COLORS.white} />
          </TouchableOpacity>
        </View>
      )}

      {callStatus === 'connecting' || callStatus === 'ringing' ? (
        <TouchableOpacity style={styles.endButton} onPress={onEndCall}>
          <Ionicons name="close" size={24} color={COLORS.white} />
        </TouchableOpacity>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingBottom: SIZES.padding * 2,
    alignItems: 'center',
  },
  controls: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: SIZES.padding,
  },
  buttonActive: {
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
  },
  endButton: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: COLORS.error,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: SIZES.padding * 2,
  },
});
