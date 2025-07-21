
// pages/index.tsx
import {useState, useRef, useCallback, useMemo, useEffect} from 'react';
import Head from 'next/head';
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  Link,
  Stack,
  Text,
  useDisclosure,
  useToast,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter
} from '@chakra-ui/react';
import { createClient } from '@supabase/supabase-js';
import { ExternalLinkIcon } from '@chakra-ui/icons';

// Constants moved outside component to prevent recreation
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const SUPABASE_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
const GPT_SIMULATOR_URL = "https://chatgpt.com/g/g-68790d6572148191a6a6c4cdb2059c68-simulador-clase-b-chile";

// Create supabase client outside component (singleton pattern)
const supabase = SUPABASE_URL && SUPABASE_KEY ? createClient(SUPABASE_URL, SUPABASE_KEY) : null;

// Validation regex patterns as constants
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const NAME_REGEX = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]{3,50}$/;

// Feature list as constant to prevent recreation
const FEATURES = [
  "✅ Preguntas oficiales CONASET actualizadas 2025",
  "✅ Test gratuito sin límites de tiempo",
  "✅ Simulador realista igual al examen real",
  "✅ Resultados instantáneos con explicaciones",
  "✅ Acceso directo al GPT oficial de CONASET"
];

// Form fields configuration
const FORM_FIELDS = [
  {
    name: 'nombre',
    label: 'Nombre completo',
    type: 'text',
    placeholder: 'Ej: Juan Pérez González'
  },
  {
    name: 'email',
    label: 'Correo electrónico',
    type: 'email',
    placeholder: 'Ej: juan@correo.com'
  },
  {
    name: 'fecha',
    label: 'Fecha de examen',
    type: 'date'
  }
] as const;

// Structured data as constant
const STRUCTURED_DATA = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "Simulador Licencia Clase B Chile",
  "description": "Simulador gratuito para el examen teórico de licencia clase B en Chile",
  "applicationCategory": "EducationalApplication",
  "operatingSystem": "Web",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "CLP"
  },
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.9",
    "ratingCount": "1287"
  }
};

// Types
interface FormData {
  nombre: string;
  email: string;
  fecha: string;
}

interface FormErrors {
  [key: string]: string;
}

// Memoized components
const SEOHead = () => (
    <Head>
      <title>Simulador Licencia Clase B Chile 2025 - Examen Teórico CONASET Gratis</title>
      <meta name="description" content="Simulador oficial licencia clase B Chile 2025. Practica gratis con preguntas reales del examen teórico CONASET. ¡Aprueba tu licencia B al primer intento!" />
      <meta name="keywords" content="simulador licencia clase b chile, examen teorico conaset, test licencia clase b, preguntas examen conducir chile" />
      <meta name="author" content="Licencia Fácil Chile" />
      <link rel="canonical" href="https://licenciafacil.cl/" />

      {/* Open Graph */}
      <meta property="og:title" content="Simulador Licencia Clase B Chile 2025 - Test CONASET Gratis" />
      <meta property="og:description" content="Practica gratis para tu examen de licencia clase B con nuestro simulador oficial. Preguntas reales del CONASET actualizadas 2025." />
      <meta property="og:image" content="https://licenciafacil.cl/og-image.jpg" />
      <meta property="og:url" content="https://licenciafacil.cl/" />
      <meta property="og:type" content="website" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content="Simulador Licencia Clase B Chile 2025" />
      <meta name="twitter:description" content="Practica con preguntas reales del examen teórico de conducir" />
      <meta name="twitter:image" content="https://licenciafacil.cl/twitter-image.jpg" />

      {/* Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify(STRUCTURED_DATA)}
      </script>
    </Head>
);

const FeatureList = () => (
    <Stack spacing={3} textAlign="left" fontSize="md" color="gray.700">
      {FEATURES.map((item, idx) => (
          <Text key={idx}>{item}</Text>
      ))}
    </Stack>
);

export default function Home() {
  const [formData, setFormData] = useState<FormData>({
    nombre: '',
    email: '',
    fecha: ''
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const initialRef = useRef<HTMLButtonElement>(null);

  // Memoize validation function
  const validateForm = useCallback(() => {
    const newErrors: FormErrors = {};

    if (!NAME_REGEX.test(formData.nombre.trim())) {
      newErrors.nombre = 'Nombre completo válido (3-50 caracteres)';
    }

    if (!EMAIL_REGEX.test(formData.email)) {
      newErrors.email = 'Email inválido';
    }

    if (!formData.fecha) {
      newErrors.fecha = 'Selecciona una fecha';
    } else {
      const selectedDate = new Date(formData.fecha);
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      if (selectedDate < today) {
        newErrors.fecha = 'La fecha debe ser futura';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [formData]);

  // Memoize submit handler
  const handleSubmit = useCallback(async () => {
    if (!validateForm()) return;

    setIsSubmitting(true);
    try {
      if (!supabase) throw new Error("Error de configuración");

      const { error } = await supabase
          .from('usuarios')
          .insert([formData]);

      if (error) throw error;

      onOpen();
    } catch (error: any) {
      toast({
        title: 'Error en registro',
        description: error.message || 'Por favor intenta nuevamente',
        status: 'error',
        duration: 4000,
        position: 'top'
      });
    } finally {
      setIsSubmitting(false);
    }
  }, [formData, validateForm, onOpen, toast]);

  // Optimize change handler
  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));

    // Clear error immediately when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  }, [errors]);

  // Memoize redirect function
  const redirectToGPT = useCallback(() => {
    window.location.href = GPT_SIMULATOR_URL;
  }, []);

  // Memoize form is valid check
  const isFormValid = useMemo(() => {
    return formData.nombre.trim() &&
        formData.email.trim() &&
        formData.fecha.trim() &&
        Object.keys(errors).length === 0;
  }, [formData, errors]);

  return (
      <>
        <SEOHead />

        <Flex
            direction="column"
            align="center"
            bgGradient="linear(to-b, blue.50, gray.100)"
            minH="100vh"
            p={[4, 6]}
        >
          <Box as="main" maxW="2xl" w="full" textAlign="center" py={10}>
            <Box bg="white" borderRadius="2xl" boxShadow="xl" overflow="hidden">
              <Box bg="blue.600" py={6} color="white">
                <Heading as="h1" size="xl" mb={2}>
                  Simulador Licencia Clase B Chile 2025
                </Heading>
                <Text fontSize="lg" opacity={0.9}>
                  Practica con preguntas reales del examen teórico de conducir
                </Text>
              </Box>

              <Box p={[4, 8]}>
                <Box mb={8} textAlign="center">
                  <Text fontSize="lg" color="gray.700" mb={6}>
                    <strong>Prepara tu examen teórico</strong> con el simulador oficial basado en el
                    libro del nuevo conductor y <strong>accede al GPT especializado</strong> de CONASET
                  </Text>

                  <Box bg="blue.50" p={6} borderRadius="xl" mb={8}>
                    <Heading as="h2" size="md" color="blue.700" mb={4}>
                      ¿Por qué nuestro simulador es el mejor?
                    </Heading>
                    <FeatureList />
                  </Box>
                </Box>

                <Box bg="white" borderWidth={1} borderColor="blue.100" borderRadius="xl" p={[4, 8]}
                     boxShadow="md">
                  <Heading as="h3" size="lg" color="blue.600" mb={6}>
                    Comienza ahora tu preparación
                  </Heading>

                  <Stack spacing={4} maxW="md" mx="auto">
                    {FORM_FIELDS.map((field) => (
                        <FormControl key={field.name} isInvalid={!!errors[field.name]} isRequired>
                          <FormLabel fontWeight={600}>{field.label}</FormLabel>
                          <Input
                              name={field.name}
                              type={field.type}
                              value={formData[field.name as keyof FormData]}
                              onChange={handleChange}
                           placeholder={'placeholder' in field ? field.placeholder : undefined}
                              bg="white"
                              borderColor="gray.300"
                              _focus={{ borderColor: "blue.500", boxShadow: "0 0 0 1px #3182ce" }}
                              size="lg"
                              min={field.type === 'date' ? new Date().toISOString().split('T')[0] : undefined}

                          />
                          <FormErrorMessage>{errors[field.name]}</FormErrorMessage>
                        </FormControl>
                    ))}

                    <Button
                        colorScheme="blue"
                        size="lg"
                        onClick={handleSubmit}
                        isLoading={isSubmitting}
                        isDisabled={!isFormValid}
                        loadingText="Registrando..."
                        height="60px"
                        fontSize="xl"
                        mt={6}
                        boxShadow="md"
                        _hover={{ transform: 'translateY(-2px)', boxShadow: 'lg' }}
                        transition="all 0.2s"
                    >
                      Acceder al Simulador GPT
                    </Button>
                  </Stack>

                  <Text mt={4} fontSize="sm" color="gray.500" textAlign="center">
                    Al registrarte aceptas nuestra{' '}
                    <Link href="/politica-privacidad" color="blue.500" fontWeight={600} isExternal>
                      Política de Privacidad
                    </Link>
                  </Text>
                </Box>
              </Box>
            </Box>

            <Box mt={8} bg="blue.50" p={6} borderRadius="xl" borderWidth={1} borderColor="blue.100">
              <Text fontSize="lg" fontWeight={600} color="blue.800" mb={3}>
                ¿Cómo funciona?
              </Text>
              <Stack spacing={3} textAlign="left" fontSize="md" color="gray.700">
                <Text>1. Completa el formulario de registro</Text>
                <Text>2. Serás redirigido al simulador oficial GPT</Text>
                <Text>3. Practica con preguntas reales de CONASET</Text>
                <Text>4. Recibe retroalimentación inmediata</Text>
                <Text>5. ¡Aprueba tu examen con confianza!</Text>
              </Stack>
            </Box>
          </Box>
        </Flex>

        {/* Modal de éxito */}
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            isCentered
            initialFocusRef={initialRef}
        >
          <ModalOverlay bg="blackAlpha.600" />
          <ModalContent borderRadius="2xl" mx={4}>
            <ModalHeader textAlign="center" fontSize="2xl" color="green.600">
              ¡Registro Exitoso!
            </ModalHeader>
            <ModalBody py={6}>
              <Text textAlign="center" fontSize="lg" mb={4}>
                Estás a punto de ser redirigido al Simulador Oficial de Licencia Clase B
              </Text>
              <Box bg="green.50" p={4} borderRadius="lg" borderWidth={1} borderColor="green.200">
                <Text fontWeight={600} color="green.800" textAlign="center">
                  Simulador GPT de CONASET
                </Text>
                <Text fontSize="sm" color="gray.600" textAlign="center" mt={2}>
                  <Link href={GPT_SIMULATOR_URL} isExternal color="blue.500">
                    {GPT_SIMULATOR_URL} <ExternalLinkIcon mx={1} />
                  </Link>
                </Text>
              </Box>
              <Text mt={4} fontSize="sm" color="gray.600" textAlign="center">
                Si la redirección no funciona, haz clic en el enlace superior
              </Text>
            </ModalBody>
            <ModalFooter justifyContent="center">
              <Button
                  colorScheme="green"
                  size="lg"
                  onClick={redirectToGPT}
                  ref={initialRef}
                  rightIcon={<ExternalLinkIcon />}
                  px={8}
              >
                Ir al Simulador GPT
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </>
  );
}
