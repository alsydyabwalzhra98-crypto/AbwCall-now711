import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Dimensions,
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useCall } from '../../../hooks/useCall';
import { CallInterface } from '../../../components/CallInterface';
import { COLORS, SIZES } from '../../../constants';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

export default function CallScreen() {
  const { id: phoneNumber } = useLocalSearchParams();
  const router = useRouter();
  const { makeCall, endCall, currentCall, callStatus } = useCall();
  const [callDuration, setCallDuration] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [isSpeakerOn, setIsSpeakerOn] = useState(false);

  useEffect(() => {
    if (phoneNumber) {
      initializeCall(phoneNumber as string);
    }

    return () => {
      if (currentCall) {
        endCall();
      }
    };
  }, [phoneNumber]);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (callStatus === 'connected') {
      interval = setInterval(() => {
        setCallDuration((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [callStatus]);

  const initializeCall = async (number: string) => {
    try {
      await makeCall(number);
    } catch (error: any) {
      Alert.alert('خطأ', error.message || 'فشل في إجراء المكالمة');
      router.back();
    }
  };

  const handleEndCall = () => {
    endCall();
    router.back();
  };

  const handleToggleMute = () => {
    setIsMuted(!isMuted);
    // Implement mute functionality
  };

  const handleToggleSpeaker = () => {
    setIsSpeakerOn(!isSpeakerOn);
    // Implement speaker functionality
  };

  const formatDuration = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <View style={styles.container}>
      <View style={styles.statusBar}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="chevron-down" size={24} color={COLORS.white} />
        </TouchableOpacity>
        <Text style={styles.statusText}>
          {callStatus === 'connecting' && 'جاري الاتصال...'}
          {callStatus === 'ringing' && 'رنين...'}
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

      <CallInterface
        callStatus={callStatus}
        isMuted={isMuted}
        isSpeakerOn={isSpeakerOn}
        onEndCall={handleEndCall}
        onToggleMute={handleToggleMute}
        onToggleSpeaker={handleToggleSpeaker}
      />
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
});
