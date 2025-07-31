# AUTONIX Platform

AUTONIX is an automated blockchain-based trading bot platform that provides professional trading tools for retail traders. This platform consists of a main website and comprehensive whitepaper documentation.

## 🚀 Key Features

- **Automated Trading Bot**: EA Bot with advanced trading algorithms
- **Blockchain Integration**: Blockchain technology for transparency and security
- **Professional Tools**: Trading tools previously only available to institutional traders
- **Community Ecosystem**: Community-based platform with sustainable tokenomics
- **Educational Resources**: Complete trading documentation and guides

## 📁 Project Structure

```
├── AUTONIX-Frontend/          # Main website (Astro + TypeScript)
│   ├── src/
│   │   ├── components/        # UI Components (Features, Products, Tokenomics, etc.)
│   │   ├── layouts/           # Layout templates
│   │   ├── pages/             # Website pages
│   │   └── styles/            # CSS styling
│   └── public/                # Static assets
├── whitepaper/                # Whitepaper documentation
├── Dockerfile                 # Docker configuration for production
├── nginx.conf                 # Nginx configuration
└── docker-compose.yml         # Docker orchestration
```

## Quick Start

### 🚀 Production (Docker)

Run the complete application with Docker:

```bash
# Build and run with Docker Compose
./run.sh

# Or manually:
docker-compose up --build
```

The application will be available at:

- **Homepage**: <http://localhost:8000>
- **AUTONIX Website**: <http://localhost:8000/autonix-frontend/>
- **Whitepaper**: <http://localhost:8000/whitepaper/>

### 🔧 Development Mode

For frontend development only:

```bash
# Run development server
./dev.sh

# Or manually:
cd AUTONIX-Frontend
npm install
npm run dev
```

Development server: <http://localhost:4324>

## 🌟 Website Features

The AUTONIX website is built with Astro framework and features:

### Main Pages

- **Landing Page**: Hero section with demo video and CTA
- **Features Section**: AUTONIX platform advantages
- **Products Section**: Overview of EA Bot and trading tools
- **Business Model**: Business model and revenue streams
- **Tokenomics**: Token distribution and platform economics
- **Roadmap**: Platform development timeline
- **Contact Page**: Contact form and company information

### Technology

- **Astro**: Modern framework for optimal performance
- **TypeScript**: Type safety and developer experience
- **Responsive Design**: Optimized for all devices
- **SEO Optimized**: SEO-friendly meta tags and structure
- **Performance**: Fast loading with static site generation

## Docker Commands

```bash
# Build image
docker compose build

# Run container
docker compose up -d

# View logs
docker compose logs -f

# Stop container
docker compose down

# Rebuild without cache
docker compose build --no-cache

# Restart container
docker compose restart
```

## Development

### Prerequisites

- **Node.js 18+**: Runtime for development
- **npm**: Package manager (included with Node.js)
- **Docker & Docker Compose**: For production deployment

### Local Development

```bash
cd AUTONIX-Frontend
npm install
npm run dev      # Development server
npm run build    # Build for production
npm run preview  # Preview build results
```

## Deployment

1. Clone repository
2. Run `./run.sh` for automatic setup
3. Access <http://localhost:8000>

## 🎯 Vision and Mission

**Vision**: Democratizing access to professional trading tools through blockchain and AI technology.

**Mission**:

- Provide an easy-to-use trading bot platform for retail traders
- Build a supportive trader community ecosystem
- Integrate blockchain technology for transparency and security
- Provide quality trading education

## 🛣️ Roadmap

- **Phase 1**: Website and documentation (✅ Completed)
- **Phase 2**: EA Bot development and testing
- **Phase 3**: Blockchain integration and token launch
- **Phase 4**: Community platform and advanced features

## 🤝 Contributing

We welcome contributions from the community! To contribute:

1. Fork this repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Create a Pull Request

### Development Guidelines

- Follow existing coding standards
- Write descriptive commit messages
- Test all changes before submitting PR
- Update documentation if needed

## 📞 Support

If you have questions or need help:

- Create an issue in the GitHub repository
- Contact the development team through the contact page

## 📄 License

This project is licensed under a license to be determined. See the `LICENSE` file for more details.
