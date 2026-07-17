'use client';

import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';
import {
  Search,
  PackageSearch,
  PackagePlus,
  Sparkles,
  Clock,
  ArrowRight,
} from 'lucide-react';
import { api } from '@/lib/api-client';
import { Card } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { EmptyState } from '@/components/ui/empty-state';

interface Profile {
  displayName: string;
  university: { name: string };
}

export function HomeScreen() {
  const hasAccessToken = api.hasAccessToken();

  const { data: profile, isLoading: profileLoading } = useQuery<Profile>({
    queryKey: ['me'],
    queryFn: () => api.get('/users/me'),
    enabled: hasAccessToken,
  });

  const { data: activeReports, isLoading: reportsLoading } = useQuery<any[]>({
    queryKey: ['me', 'lost-items'],
    queryFn: () => api.get('/users/me/lost-items'),
    enabled: hasAccessToken,
  });

  return (
    <div className="px-4 py-6 sm:px-6 md:py-10 lg:px-8">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-8">
        <section className="overflow-hidden rounded-[2rem] border border-ink-100 bg-surface-raised shadow-sm">
          <div className="grid gap-0 lg:grid-cols-[1.25fr_0.75fr]">
            <div className="flex flex-col justify-center p-6 sm:p-8 lg:p-12">
              {profileLoading ? (
                <div className="flex flex-col gap-3">
                  <Skeleton className="h-5 w-40" />
                  <Skeleton className="h-12 w-72 max-w-full" />
                </div>
              ) : (
                <>
                  <p className="mb-3 text-sm font-medium text-ink-400">
                    {profile?.university?.name ?? 'Your university'}
                  </p>

                  <h1 className="max-w-2xl font-display text-3xl font-bold tracking-tight text-ink-900 sm:text-4xl lg:text-5xl">
                    Hi {profile?.displayName?.split(' ')[0] ?? 'there'}.
                    Let&apos;s get lost items home.
                  </h1>

                  <p className="mt-4 max-w-xl text-sm leading-6 text-ink-400 sm:text-base">
                    Search your campus network, report an item, and track
                    possible matches from one private university space.
                  </p>
                </>
              )}

              <Link
                href="/search"
                className="mt-7 flex w-full max-w-2xl items-center gap-3 rounded-2xl border border-ink-100 bg-surface px-4 py-3.5 text-ink-400 shadow-sm transition hover:border-ink-200 hover:bg-white"
              >
                <Search className="h-5 w-5 flex-shrink-0" />
                <span className="text-sm">
                  Search lost or found items...
                </span>
              </Link>
            </div>

            <div className="grid gap-3 border-t border-ink-100 bg-ink-50/70 p-6 sm:grid-cols-2 lg:grid-cols-1 lg:border-l lg:border-t-0 lg:p-8">
              <ActionCard
                href="/report/lost"
                icon={<PackageSearch className="h-6 w-6" />}
                title="Report Lost Item"
                description="Tell us what went missing and start automatic matching."
              />

              <ActionCard
                href="/report/found"
                icon={<PackagePlus className="h-6 w-6 text-amber-500" />}
                title="Report Found Item"
                description="Found something on campus? Help return it safely."
              />
            </div>
          </div>
        </section>

        <div className="grid gap-8 lg:grid-cols-2">
          <section className="flex min-w-0 flex-col gap-4">
            <div className="flex items-center justify-between">
              <h2 className="flex items-center gap-2 font-display text-xl font-semibold text-ink-900">
                <Sparkles className="h-5 w-5 text-amber-500" />
                Possible Matches
              </h2>

              <Link
                href="/matches"
                className="flex items-center gap-1 text-sm font-medium text-ink-500 transition hover:text-ink-800"
              >
                See all
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            <MatchesPreview />
          </section>

          <section className="flex min-w-0 flex-col gap-4">
            <h2 className="flex items-center gap-2 font-display text-xl font-semibold text-ink-900">
              <Clock className="h-5 w-5 text-ink-400" />
              Your Active Reports
            </h2>

            {reportsLoading ? (
              <div className="flex flex-col gap-2">
                <Skeleton className="h-20 w-full" />
                <Skeleton className="h-20 w-full" />
              </div>
            ) : !activeReports || activeReports.length === 0 ? (
              <EmptyState
                title="No active reports yet"
                description="Reports you file will show up here so you can track their status."
              />
            ) : (
              <div className="flex flex-col gap-3">
                {activeReports.map((item) => (
                  <Card
                    key={item.id}
                    className="flex items-center justify-between"
                  >
                    <div className="min-w-0">
                      <p className="truncate font-medium text-ink-800">
                        {item.title}
                      </p>
                      <p className="text-xs text-ink-400">{item.status}</p>
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </section>
        </div>
      </div>
    </div>
  );
}

function ActionCard({
  href,
  icon,
  title,
  description,
}: {
  href: string;
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <Link href={href} className="group block">
      <Card className="flex h-full items-start gap-4 transition group-hover:-translate-y-0.5 group-hover:border-ink-200 group-hover:shadow-md">
        <span className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl bg-white text-ink-700 shadow-sm">
          {icon}
        </span>

        <div className="min-w-0 flex-1">
          <p className="font-semibold text-ink-900">{title}</p>
          <p className="mt-1 text-sm leading-5 text-ink-400">
            {description}
          </p>
        </div>

        <ArrowRight className="mt-1 h-4 w-4 flex-shrink-0 text-ink-300 transition group-hover:translate-x-1 group-hover:text-ink-600" />
      </Card>
    </Link>
  );
}

function MatchesPreview() {
  const hasAccessToken = api.hasAccessToken();

  const { data, isLoading } = useQuery<any[]>({
    queryKey: ['matches', 'preview'],
    queryFn: async () => {
      const lostItems = await api.get<Array<{ id: string }>>(
        '/users/me/lost-items'
      );

      if (lostItems.length === 0) {
        return [];
      }

      const matchGroups = await Promise.all(
        lostItems.map((item) =>
          api.get<any[]>(`/matches/for-lost-item/${item.id}`)
        )
      );

      return matchGroups.flat().slice(0, 3);
    },
    enabled: hasAccessToken,
  });

  if (isLoading) {
    return <Skeleton className="h-32 w-full" />;
  }

  if (!data || data.length === 0) {
    return (
      <EmptyState
        title="No matches yet"
        description="We'll notify you the moment something matching your report turns up."
      />
    );
  }

  return (
    <div className="flex flex-col gap-3">
      {data.map((match) => (
        <Link
          key={match.id}
          href="/matches"
          className="block"
        >
          <Card className="flex items-center justify-between gap-4 transition hover:border-ink-200 hover:shadow-md">
            <div className="min-w-0">
              <p className="truncate font-medium text-ink-800">
                {match.foundItem?.title ?? 'Possible found item'}
              </p>
              <p className="mt-1 text-xs text-ink-400">
                {match.tier ?? 'Possible match'}
              </p>
            </div>

            <ArrowRight className="h-4 w-4 flex-shrink-0 text-ink-300" />
          </Card>
        </Link>
      ))}
    </div>
  );
}
