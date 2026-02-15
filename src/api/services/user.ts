import type { AuthStatusResponse } from "@/types";
import { api } from "@api/axios/index";

export const getAuthenticatedUser = async (): Promise<AuthStatusResponse> => {
    return await api.get("/api/account/authenticated");
}

// Get Current User Profile Data
export const getCurrentUserProfile = async (): Promise<any> => {
    return await api.get("/api/account/profile");
}

// Upload Avatar
export const uploadAvatar = async (file: File): Promise<any> => {
    // Validate file size (max 2MB)
    const MAX_FILE_SIZE = 2 * 1024 * 1024; // 2MB
    if (file.size > MAX_FILE_SIZE) {
        throw new Error(`File size must be less than 2MB. Current: ${(file.size / 1024 / 1024).toFixed(2)}MB`);
    }

    const formData = new FormData();
    formData.append('avatarFile', file);
    
    console.log('📤 FormData prepared:', { fileName: file.name, fileSize: file.size, fileType: file.type });
    
    return await api.post("/api/account/profile/avatar", formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
        timeout: 60000, // 60 seconds for upload
    });
}

// Get avatar image URL - use direct CloudFront for now
export const getAvatarUrl = (cloudFrontUrl: string): string => {
    // For now, return CloudFront URL directly
    // Backend should configure CloudFront CORS or provide presigned S3 URL
    return cloudFrontUrl;
};

// Update User Bio
export const updateUserBio = async (bio: string): Promise<any> => {
    return await api.post("/api/account/profile/bio", { bio });
};

// Fetch avatar from AWS S3 through backend proxy
export const fetchAvatarAsBlob = async (s3Url: string): Promise<string> => {
    try {
        console.log('📥 Fetching avatar from S3:', s3Url);
        
        // Try direct S3 access first
        const response = await fetch(s3Url, {
            credentials: 'include', // Send cookies for signed URLs
        });
        
        if (!response.ok) {
            throw new Error(`Failed to fetch: ${response.status}`);
        }
        
        const blob = await response.blob();
        const blobUrl = URL.createObjectURL(blob);
        console.log('✅ Avatar blob URL created:', blobUrl);
        return blobUrl;
    } catch (error) {
        console.warn('⚠️ Failed to fetch avatar blob:', error);
        // Fallback to original URL
        return s3Url;
    }
};

// Get Full Leaderboard (for tie-breaker sorting)
export const getLeaderboard = async (): Promise<any> => {
    return await api.get("/api/leaderboard/all");
}

// Login Service
export const loginUser = async (data: {
    email: string;
    password: string;
    isRememberMe: boolean;
}): Promise<AuthStatusResponse> => {
    return await api.post("/api/account/login", data);
}

// OTP Services
export const requestOtp = async (email: string): Promise<{ success: boolean; message: string }> => {
    return await api.post("/api/otp/request", { email });
}

export const verifyOtp = async (email: string, otp: string): Promise<{ success: boolean; message: string }> => {
    return await api.post("/api/otp/verify", { 
        email, 
        otp 
    });
}

// Register Service
export const registerUser = async (data: {
    username: string;
    email: string;
    password: string;
    confirmPassword: string;
}): Promise<AuthStatusResponse> => {
    return await api.post("/api/account/register", data);
}

// Reset Password Services
export const resetPassword = async (data: {
  token: string;
  password: string;
  confirmPassword: string;
}): Promise<{ success: boolean; message: string }> => {
  return await api.post("/api/account/reset-password", data);
};


// Forgot Password Service
export const forgotPassword = async (
  email: string
): Promise<{ success: boolean; message: string }> => {
  return await api.post("/api/account/forgot-password", { email });
};


// Dashboard Service
export const getDashboard = async (): Promise<any> => {
    return await api.get("/api/dashboard");
}


// Change Password Service
export const changePassword = async (data: {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}): Promise<{ success: boolean; message: string }> => {
  return await api.post("/api/account/change-password", data);
};

// Get Lessons by Course ID
export const getLessonsByCourse = async (courseId: string): Promise<any> => {
  return await api.get(`/learning/progress/lessons?courseId=${courseId}`);
};