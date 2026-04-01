import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SIZES } from '../../constants/index';

export default function CallScreen() {
  const { id: phoneNumber } = useLocalSearchParams();
  const router = useRouter();
  const [callDuration, setCallDuration] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [isSpeakerOn, setIsSpeakerOn] = useState(false);
  const [callStatus, setCallStatus] = useState<'connecting' | 'connected' | 'ended'>('connecting');

  useEffect(() => {
    setTimeout(() => setCallStatus('connected'), 2000);
  }, []);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (callStatus === 'connected') {
      interval = setInterval(() => {
        setCallDuration((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [callStatus]);

  const formatDuration = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleEndCall = () => {
    router.back();
  };

  return (
    <View style={styles.container}>
      <View style={styles.statusBar}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="chevron-down" size={24} color={COLORS.white} />
        </TouchableOpacity>
        <Text style={styles.statusText}>
          {callStatus === 'connecting' && 'جاري الاتصال...'}
          {callStatus === 'connected' && 'متصل'}
          {callStatus === 'ended' && 'انتهت المكالمة'}
        </Text>
        <View style={styles.placeholder} />
      </View>

      <View style={styles.callInfo}>
        <View style={styles.avatar}>
          <Ionicons name="person" size={80} color={COLORS.white} />
        </View>
        <Text style={styles.phoneNumber}>{phoneNumber}</Text>
        <Text style={styles.duration}>
          {callStatus === 'connected' ? formatDuration(callDuration) : ''}
        </Text>
      </View>

      <View style={styles.controls}>
        <TouchableOpacity
          style={[styles.controlButton, isMuted && styles.controlButtonActive]}
          onPress={() => setIsMuted(!isMuted)}
        >
          <Ionicons
            name={isMuted ? 'mic-off' : 'mic'}
            size={24}
            color={COLORS.white}
          />
        </TouchableOpacity>

        <TouchableOpacity style={styles.endCallButton} onPress={handleEndCall}>
          <Ionicons name="call" size={24} color={COLORS.white} />
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.controlButton, isSpeakerOn && styles.controlButtonActive]}
          onPress={() => setIsSpeakerOn(!isSpeakerOn)}
        >
          <Ionicons
            name={isSpeakerOn ? 'volume-high' : 'volume-mute'}
            size={24}
            color={COLORS.white}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.primary,
  },
  statusBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: SIZES.padding,
    paddingTop: SIZES.padding * 2,
    paddingBottom: SIZES.padding,
  },
  statusText: {
    fontSize: SIZES.body3,
    color: COLORS.white,
    fontWeight: '500',
  },
  placeholder: {
    width: 24,
  },
  callInfo: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: SIZES.padding * 2,
  },
  avatar: {
    width: 160,
    height: 160,
    borderRadius: 80,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: SIZES.padding * 2,
  },
  phoneNumber: {
    fontSize: SIZES.h2,
    fontWeight: 'bold',
    color: COLORS.white,
    marginBottom: SIZES.base,
  },
  duration: {
    fontSize: SIZES.body3,
    color: 'rgba(255, 255, 255, 0.8)',
  },
  controls: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: SIZES.padding * 3,
  },
  controlButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: SIZES.padding,
  },
  controlButtonActive: {
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
  },
  endCallButton: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: '#FF3B30',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
