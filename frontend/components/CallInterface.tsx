import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SIZES } from '../constants/colors';

interface CallInterfaceProps {
  callStatus: 'connecting' | 'ringing' | 'connected' | 'ended';
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
      <View style={styles.controls}>
        <TouchableOpacity
          style={[styles.controlButton, isMuted && styles.controlButtonActive]}
          onPress={onToggleMute}
        >
          <Ionicons
            name={isMuted ? 'mic-off' : 'mic'}
            size={24}
            color={COLORS.white}
          />
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.controlButton, isSpeakerOn && styles.controlButtonActive]}
          onPress={onToggleSpeaker}
        >
          <Ionicons
            name={isSpeakerOn ? 'volume-high' : 'volume-medium'}
            size={24}
            color={COLORS.white}
          />
        </TouchableOpacity>

        <TouchableOpacity style={styles.controlButton}>
          <Ionicons name="videocam" size={24} color={COLORS.white} />
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        style={[
          styles.endCallButton,
          callStatus === 'ended' && styles.endCallButtonDisabled,
        ]}
        onPress={onEndCall}
        disabled={callStatus === 'ended'}
      >
        <Ionicons name="call" size={32} color={COLORS.white} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: SIZES.padding * 2,
    paddingBottom: SIZES.padding * 3,
  },
  controls: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: SIZES.padding * 2,
  },
  controlButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  controlButtonActive: {
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
  },
  endCallButton: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: COLORS.error,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    transform: [{ rotate: '135deg' }],
  },
  endCallButtonDisabled: {
    backgroundColor: COLORS.gray,
  },
});
