import { Platform, StyleSheet } from 'react-native';
import { AppTheme } from '@/themes';

export const getHomeStyles = (theme: AppTheme) =>
  StyleSheet.create({
    container: {
      flex: 1,
    },
    scrollView: {
      flex: 1,
    },
    scrollContent: {
      flexGrow: 1,
      paddingBottom: theme.vSpacings.xl4,
    },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginTop: Platform.OS === 'android' ? theme.vSpacings.xl2 : 0,
      marginHorizontal: theme.hSpacings.md,
      marginBottom: theme.vSpacings.lg,
    },
    welcomeContainer: {
      flex: 1,
    },
    welcomeText: {
      color: theme.colors.titleBold,
      fontSize: theme.fontSizes.xl,
      fontFamily: theme.fontFamily.bold,
    },
    searchButton: {
      width: 40,
      height: 40,
      borderRadius: 20,
      backgroundColor: theme.colors.buttonBack,
      justifyContent: 'center',
      alignItems: 'center',
    },
    section: {
      marginHorizontal: theme.hSpacings.md,
      marginBottom: theme.vSpacings.xl,
    },
    sectionTitle: {
      color: theme.colors.titleBold,
      fontSize: theme.fontSizes.lg,
      fontFamily: theme.fontFamily.bold,
      marginBottom: theme.vSpacings.md,
    },
    coursesList: {
      paddingRight: theme.hSpacings.md,
    },
    courseCard: {
      width: 280,
      backgroundColor: theme.colors.terciary,
      borderRadius: 16,
      marginRight: theme.hSpacings.md,
      padding: theme.hSpacings.md,
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.1,
      shadowRadius: 3.84,
      elevation: 5,
    },
    courseImageContainer: {
      width: '100%',
      height: 120,
      borderRadius: 12,
      marginBottom: theme.vSpacings.sm,
    },
    courseImage: {
      width: '100%',
      height: '100%',
      borderRadius: 12,
    },
    courseContent: {
      flex: 1,
    },
    courseTitle: {
      color: theme.colors.cardTitle,
      fontSize: theme.fontSizes.md,
      fontFamily: theme.fontFamily.bold,
      marginBottom: theme.vSpacings.xs,
    },
    courseSubtitle: {
      color: theme.colors.cardSubtitle,
      fontSize: theme.fontSizes.sm,
      fontFamily: theme.fontFamily.regular,
      marginBottom: theme.vSpacings.sm,
    },
    progressContainer: {
      marginBottom: theme.vSpacings.md,
    },
    progressText: {
      color: theme.colors.cardSubtitle,
      fontSize: theme.fontSizes.xs,
      fontFamily: theme.fontFamily.medium,
      marginTop: theme.vSpacings.xs,
    },
    continueButton: {
      backgroundColor: theme.colors.primary,
      borderRadius: 8,
      paddingVertical: theme.vSpacings.xs,
      paddingHorizontal: theme.hSpacings.sm,
      alignItems: 'center',
    },
    continueButtonText: {
      color: theme.colors.buttonActionTitle,
      fontSize: theme.fontSizes.xs,
      fontFamily: theme.fontFamily.bold,
    },
    resumeCard: {
      backgroundColor: theme.colors.terciary,
      borderRadius: 16,
      padding: theme.hSpacings.md,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.1,
      shadowRadius: 3.84,
      elevation: 5,
    },
    resumeContent: {
      flex: 1,
    },
    resumeTitle: {
      color: theme.colors.cardTitle,
      fontSize: theme.fontSizes.md,
      fontFamily: theme.fontFamily.bold,
      marginBottom: theme.vSpacings.xs,
    },
    resumeSubtitle: {
      color: theme.colors.cardSubtitle,
      fontSize: theme.fontSizes.sm,
      fontFamily: theme.fontFamily.regular,
    },
    resumeButton: {
      backgroundColor: theme.colors.accented,
      borderRadius: 8,
      paddingVertical: theme.vSpacings.sm,
      paddingHorizontal: theme.hSpacings.md,
      marginLeft: theme.hSpacings.sm,
    },
    resumeButtonText: {
      color: theme.colors.buttonActionTitle,
      fontSize: theme.fontSizes.sm,
      fontFamily: theme.fontFamily.bold,
    },
    libraryGrid: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      marginHorizontal: -theme.hSpacings.xs,
    },
    libraryItemWrapper: {
      width: '50%',
      paddingHorizontal: theme.hSpacings.xs,
      marginBottom: theme.vSpacings.md,
    },
    libraryItem: {
      backgroundColor: theme.colors.terciary,
      borderRadius: 16,
      padding: theme.hSpacings.md,
      alignItems: 'center',
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.1,
      shadowRadius: 3.84,
      elevation: 5,
      minHeight: 120,
      justifyContent: 'center',
    },
    libraryIconContainer: {
      width: 48,
      height: 48,
      borderRadius: 24,
      backgroundColor: theme.colors.secondary,
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: theme.vSpacings.sm,
    },
    libraryIcon: {
      fontSize: theme.fontSizes.xl,
    },
    libraryTitle: {
      color: theme.colors.cardTitle,
      fontSize: theme.fontSizes.sm,
      fontFamily: theme.fontFamily.medium,
      textAlign: 'center',
    },
    badge: {
      position: 'absolute',
      top: 8,
      right: 8,
      backgroundColor: '#EE3B2B',
      borderRadius: 12,
      paddingHorizontal: theme.hSpacings.xs,
      paddingVertical: 2,
    },
    badgeText: {
      color: '#FFFFFF',
      fontSize: theme.fontSizes.xxs,
      fontFamily: theme.fontFamily.bold,
    },
    bottomSpacer: {
      height: theme.vSpacings.xl4,
    },
  });
