import { RTCPeerConnection, RTCSessionDescription, mediaDevices } from 'react-native-webrtc';

class WebRTCService {
  private peerConnection: RTCPeerConnection | null = null;
  private localStream: MediaStream | null = null;
  private remoteStream: MediaStream | null = null;

  async initialize(): Promise<void> {
    try {
      const peerConnectionConfig = {
        iceServers: [
          { urls: ['stun:stun.l.google.com:19302'] },
          { urls: ['stun:stun1.l.google.com:19302'] },
        ],
      };

      this.peerConnection = new RTCPeerConnection(peerConnectionConfig);

      this.peerConnection.onicecandidate = (event) => {
        if (event.candidate) {
          console.log('New ICE candidate:', event.candidate);
        }
      };

      this.peerConnection.onaddstream = (event) => {
        this.remoteStream = event.stream;
      };

      const constraints = { audio: true, video: false };
      this.localStream = await mediaDevices.getUserMedia(constraints);
      this.localStream.getTracks().forEach((track) => {
        this.peerConnection?.addTrack(track, this.localStream!);
      });
    } catch (error) {
      console.error('WebRTC initialization error:', error);
      throw error;
    }
  }

  async createOffer(): Promise<RTCSessionDescription> {
    if (!this.peerConnection) {
      throw new Error('Peer connection not initialized');
    }
    return this.peerConnection.createOffer();
  }

  async createAnswer(offer: RTCSessionDescription): Promise<RTCSessionDescription> {
    if (!this.peerConnection) {
      throw new Error('Peer connection not initialized');
    }
    await this.peerConnection.setRemoteDescription(offer);
    return this.peerConnection.createAnswer();
  }

  async setLocalDescription(desc: RTCSessionDescription): Promise<void> {
    if (!this.peerConnection) {
      throw new Error('Peer connection not initialized');
    }
    await this.peerConnection.setLocalDescription(desc);
  }

  async setRemoteDescription(desc: RTCSessionDescription): Promise<void> {
    if (!this.peerConnection) {
      throw new Error('Peer connection not initialized');
    }
    await this.peerConnection.setRemoteDescription(desc);
  }

  async addIceCandidate(candidate: any): Promise<void> {
    if (!this.peerConnection) {
      throw new Error('Peer connection not initialized');
    }
    await this.peerConnection.addIceCandidate(candidate);
  }

  async hangup(): Promise<void> {
    if (this.localStream) {
      this.localStream.getTracks().forEach((track) => track.stop());
      this.localStream = null;
    }
    if (this.peerConnection) {
      this.peerConnection.close();
      this.peerConnection = null;
    }
    this.remoteStream = null;
  }

  getLocalStream(): MediaStream | null {
    return this.localStream;
  }

  getRemoteStream(): MediaStream | null {
    return this.remoteStream;
  }
}

export const webrtcService = new WebRTCService();
