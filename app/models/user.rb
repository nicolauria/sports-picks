class User < ApplicationRecord
    validates :email, :password_digest, :session_token, presence: true
    validates :email, uniqueness: true
    validates :email, format: { with: URI::MailTo::EMAIL_REGEXP }
    validates :password, length: {minimum: 6, allow_nil: true}

    after_initialize :ensure_session_token
    
    attr_reader :password

    def self.find_by_credentials(email, password)
        user = User.find_by_email(email)
        user && user.has_password?(password) ? user : nil
    end

    def has_password?(password)
        BCrypt::Password.new(self.password_digest).is_password?(password)
    end

    def password=(password)
        @password = password
        self.password_digest = BCrypt::Password.create(password)
    end

    def reset_session_token!
        self.session_token = SecureRandom.urlsafe_base64
        self.save!
        self.session_token
    end

    private
    def ensure_session_token
        self.session_token ||= SecureRandom.urlsafe_base64
    end
end
